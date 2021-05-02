import { 
    createCampaign, 
    getCampaign,
    setPlayerData,
    setTime,
    setMap,
    setNpcs,
    setLocation,
    addMessage,
    getLog
} from './db';

export default (socket, server) => {
    console.log("admin connected");
    let campaign_id = "";
    const name = socket.handshake.headers.name;

    socket.on("create_campaign", id => {
        if (!id) return;
        createCampaign(id, name).then(instance => {
            socket.emit("campaign_created", instance);
        });
    });

    socket.on("get_campaign_instance", instance_id => {
        if (!instance_id) return;
        getCampaign(instance_id).then(instance => {
            socket.emit("campaign_instance_retrieved", instance);
        })
    });

    socket.on("update_players", (instance_id, data) => {
        if (!instance_id) return;
        setPlayerData(instance_id, data).then(instance => {
            server.emit("player_data_update", data);
        })
    });
    
    socket.on("update_time", (instance_id, data) => {
        if (!instance_id) return;
        setTime(instance_id, data).then(instance => {
            server.emit("time_update", data);
        })
    })

    socket.on("log_message", (instance_id, message) => {
        if (!instance_id) return;
        addMessage(instance_id, `GM (${name})`, message).then(instance => {
            getLog(instance_id).then(log => {
                server.emit('log_update', log);
            });
        });
    });

    socket.on("update_map", (instance_id, map) => {
        if (!instance_id) return;
        setMap(instance_id, map).then(instance => {
            server.emit("map_update", map);
        })
    })

    socket.on("update_npcs", (instance_id, map) => {
        if (!instance_id) return;
        console.log("NPCs changed");
        setNpcs(instance_id, map).then(instance => {
            server.emit("npcs_update", map);
        })
    })

    socket.on("update_location", (instance_id, loc) => {
        if (!instance_id) return;
        setLocation(instance_id, loc).then(instance => {
            server.emit("location_update", loc);
        })
    })

    //admin handlers and dispatchers here
}