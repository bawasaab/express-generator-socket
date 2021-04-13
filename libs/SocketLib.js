let $this;

module.exports = class SocketLib {

    constructor() {
        console.log('inside socketLib');
        $this = this;
    }

    connection( socket ) {

        console.log('inside socket connect');
        socket.on( 'disconnect', $this.disconnect );
        socket.on( 'message', $this.message );
    }

    disconnect( socket ) {
        console.log('inside disconnect');
    }

    message( socket ) {
        console.log('inside message');
        console.log('message socket details', socket);
    }
}