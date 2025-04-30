class Comment {
    constructor(uid, username, text, createdAt) {
      this.uid = uid;           
      this.username = username; 
      this.text = text;        
      this.createdAt = createdAt || new Date(); 
    }
  }
  
  module.exports = { Comment };