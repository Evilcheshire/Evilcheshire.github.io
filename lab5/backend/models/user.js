class User {
    constructor(uid, displayName, email, createdAt) {
      this.uid = uid;           
      this.displayName = displayName; 
      this.email = email;         
      this.createdAt = createdAt || new Date();
    }
  }

  module.exports = { User };