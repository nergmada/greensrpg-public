import {getCampaign, addMessage, getLog} from './db';

export default (socket, server) => {
    console.log("player connected");
    const name = socket.handshake.headers.name;

    socket.on("dice_six", (instance_id) => {
        const outcome = Math.ceil(Math.random() * 6);
        server.emit("six_roll", outcome);
        addMessage(instance_id, name, `rolled a ${outcome}`).then(instance => {
            getLog(instance_id).then(log => {
                server.emit('log_update', log);
            });
        });
    });
    socket.on("dice_twenty", (instance_id) => {
        const outcome = Math.ceil(Math.random() * 20);
        server.emit("twenty_roll", outcome);
        const additional = outcome === 19 ? 
            `minor effect` : 
            outcome === 20 ? 
                `major effect & stat recovery` : 
                outcome === 1 ? `GM Intrusion` : '';
        const damage = outcome > 16 ? ` ${outcome - 16} Bonus Damage` : ''; 
        addMessage(instance_id, name, `rolled a ${outcome} ${additional}${damage}`).then(instance => {
            getLog(instance_id).then(log => {
                server.emit('log_update', log);
            });
        });
    });
    socket.on("dice_hundred", (instance_id) => {
        const outcome = Math.floor(Math.random() * 100);
        server.emit("hundred_roll", outcome);
        addMessage(instance_id, name, `rolled a ${outcome}`).then(instance => {
            getLog(instance_id).then(log => {
                server.emit('log_update', log);
            });
        });
    });

    socket.on("get_campaign_instance", instance_id => {
        getCampaign(instance_id).then(instance => {
            socket.emit("campaign_instance_retrieved", instance);
        })
    });

    socket.on("get_characters", instance_id => {
        getCampaign(instance_id).then(instance => {
            socket.emit("characters_retrieved", instance.campaign.player_characters);
        })
    });

    socket.on("log_message", (instance_id, message) => {
        console.log("messsage received");
        addMessage(instance_id, name, message).then(instance => {
            getLog(instance_id).then(log => {
                server.emit('log_update', log);
            });
        });
    });

    //player handlers and dispatchers here
}