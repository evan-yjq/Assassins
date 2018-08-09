function handle(data, params) {
    console.log('成功载入插件');
    for (let i = 0; i < Object.keys(params).length; i++) {
        if (Object.keys(params)[i] === 'param') {
            params['param'] = cleanParam(Object.values(params)[i]);
        }
    }
    return params
}


function cleanParam(param){
    return param
}

module.exports = {
    handle :handle
};