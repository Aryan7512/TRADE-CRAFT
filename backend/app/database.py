"""
Supabase Database Client
Provides connection and query utilities for Supabase PostgreSQL
"""

from supabase import create_client, Client
from app.config import settings
from typing import Optional, Dict, Any, List
import logging

logger = logging.getLogger(__name__)


class Database:
    """Supabase database client wrapper"""
    
    def __init__(self):
        self.client: Client = create_client(
            settings.supabase_url,
            settings.supabase_key
        )
        self.service_client: Client = create_client(
            settings.supabase_url,
            settings.supabase_service_key
        )
    
    # ==================== USER OPERATIONS ====================
    
    async def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            response = self.client.table("users").select("*").eq("id", user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error fetching user {user_id}: {e}")
            return None
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            response = self.client.table("users").select("*").eq("email", email).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error fetching user by email {email}: {e}")
            return None
    
    async def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create new user"""
        try:
            # Use service_client to bypass RLS since we've validated the user in the route
            response = self.service_client.table("users").insert(user_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return None
    
    async def update_user(self, user_id: str, user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update user profile"""
        try:
            # Use service_client to bypass RLS since we've validated the user in the route
            response = self.service_client.table("users").update(user_data).eq("id", user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error updating user {user_id}: {e}")
            return None
    
    # ==================== SKILL OPERATIONS ====================
    
    async def get_user_skills(self, user_id: str, mode: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all skills for a user, optionally filtered by mode (TEACH/LEARN)"""
        try:
            query = self.client.table("skills").select("*").eq("user_id", user_id)
            if mode:
                query = query.eq("mode", mode)
            response = query.execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching skills for user {user_id}: {e}")
            return []
    
    async def create_skill(self, skill_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create new skill with embedding"""
        try:
            response = self.client.table("skills").insert(skill_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating skill: {e}")
            return None
    
    async def update_skill(self, skill_id: str, skill_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update skill"""
        try:
            response = self.client.table("skills").update(skill_data).eq("id", skill_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error updating skill {skill_id}: {e}")
            return None
    
    async def delete_skill(self, skill_id: str, user_id: str) -> bool:
        """Delete skill (with ownership check)"""
        try:
            response = self.client.table("skills").delete().eq("id", skill_id).eq("user_id", user_id).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error deleting skill {skill_id}: {e}")
            return False
    
    async def find_similar_skills(
        self, 
        embedding: List[float], 
        mode: str, 
        limit: int = 10,
        exclude_user_id: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Find similar skills using vector similarity"""
        try:
            # Use the RPC function defined in schema.sql
            response = self.service_client.rpc(
                "find_similar_skills",
                {
                    "query_embedding": embedding,
                    "query_mode": mode,
                    "limit_count": limit
                }
            ).execute()
            
            results = response.data or []
            
            # If we need to exclude a user, filter the results
            if exclude_user_id:
                results = [r for r in results if r.get("user_id") != exclude_user_id]
            
            # Convert RPC result format to expected format
            enriched_results = []
            for result in results:
                # Get the full skill data
                skill_response = self.client.table("skills").select("*").eq("id", result["skill_id"]).execute()
                if skill_response.data:
                    skill = skill_response.data[0]
                    skill["similarity"] = result.get("similarity", 0)
                    enriched_results.append(skill)
            
            return enriched_results[:limit]
        except Exception as e:
            logger.error(f"Error finding similar skills: {e}")
            return []
    
    # ==================== MATCH OPERATIONS ====================
    
    async def get_user_matches(self, user_id: str, status: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all matches for a user"""
        try:
            query = self.client.table("matches").select(
                "*, user1:users!matches_user1_id_fkey(*), user2:users!matches_user2_id_fkey(*), "
                "skill1:skills!matches_skill1_id_fkey(*), skill2:skills!matches_skill2_id_fkey(*)"
            ).or_(f"user1_id.eq.{user_id},user2_id.eq.{user_id}")
            
            if status:
                query = query.eq("status", status)
            
            response = query.order("total_score", desc=True).execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching matches for user {user_id}: {e}")
            return []
    
    async def create_match(self, match_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create new match"""
        try:
            response = self.client.table("matches").insert(match_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating match: {e}")
            return None
    
    async def update_match(self, match_id: str, match_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update match status"""
        try:
            response = self.client.table("matches").update(match_data).eq("id", match_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error updating match {match_id}: {e}")
            return None
    
    # ==================== SESSION OPERATIONS ====================
    
    async def get_match_sessions(self, match_id: str) -> List[Dict[str, Any]]:
        """Get all sessions for a match"""
        try:
            response = self.client.table("sessions").select("*").eq("match_id", match_id).order("scheduled_at").execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching sessions for match {match_id}: {e}")
            return []
    
    async def create_session(self, session_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create new session"""
        try:
            response = self.client.table("sessions").insert(session_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating session: {e}")
            return None
    
    async def update_session(self, session_id: str, session_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update session"""
        try:
            response = self.client.table("sessions").update(session_data).eq("id", session_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error updating session {session_id}: {e}")
            return None

    async def get_user_sessions(self, user_id: str) -> List[Dict[str, Any]]:
        """Get all sessions for a user across all their matches"""
        try:
            # Join with matches to filter by user participation
            # Note: the foreign key syntax matches!inner ensures we only get sessions linked to matches valid for this user
            response = self.client.table("sessions").select(
                "*, match:matches!inner(user1_id, user2_id, user1:users!matches_user1_id_fkey(name, email), user2:users!matches_user2_id_fkey(name, email))"
            ).or_(f"user1_id.eq.{user_id},user2_id.eq.{user_id}", foreign_table="match").order("scheduled_at").execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching user sessions {user_id}: {e}")
            return []
    
    # ==================== MESSAGE OPERATIONS ====================
    
    async def get_match_messages(self, match_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get messages for a match"""
        try:
            response = (
                self.client.table("messages")
                .select("*, sender:users!messages_sender_id_fkey(id, name, avatar_url)")
                .eq("match_id", match_id)
                .order("created_at", desc=False)
                .limit(limit)
                .execute()
            )
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching messages for match {match_id}: {e}")
            return []
    
    async def create_message(self, message_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create new message"""
        try:
            response = self.client.table("messages").insert(message_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating message: {e}")
            return None
    
    async def mark_messages_read(self, match_id: str, user_id: str) -> bool:
        """Mark all messages in a match as read for a user"""
        try:
            response = (
                self.client.table("messages")
                .update({"is_read": True})
                .eq("match_id", match_id)
                .neq("sender_id", user_id)
                .execute()
            )
            return True
        except Exception as e:
            logger.error(f"Error marking messages read: {e}")
            return False


# Global database instance
db = Database()
