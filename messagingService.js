class MessagingService{
    constructor(){
        this.users = [];
        this.usersMsgCount = [];
        this.connections = [];
        this.messages = [];
    }

    getUsers(){
        return this.users;
    }

    getMessages(){
        return this.messages;
    }

    getConnections(){
        return this.connections;
    }

    setUser(user){
        if(this.users.indexOf(user)>-1){
            this.users.push(user);
            this.usersMsgCount.push(0);
            return true
        }
        return false
    }

    setMessage(user,msg){
        let el = '<li><strong>'+user+':</strong>'+msg+'</li>';
        this.messages.push(el);
        this.usersMsgCount[this.users.indexOf(user)]++
    }
}
export default new MessagingService();