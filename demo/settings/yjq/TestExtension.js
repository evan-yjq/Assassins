/**
 * 插件调用方法示例
 * handle(data, params)方法在每次测试接口时在程序中调用
 * 仅且只有此方法对外开放
 * @data    {JSON}  配置文件数据
 * @params  {JSON}  传入参数
 * @return  {JSON}  返回参数
 */
function handle(data, params) {
    console.log('成功载入插件');
    for (let i = 0; i < Object.keys(params).length; i++) {
        if (Object.keys(params)[i] === 'param') {
            params['param'] = cleanParam(Object.values(params)[i]);
        }
    }
    return params
}

/**
 * 自定义方法
 * 不对外开放
 * @paramV  {string}    参数值
 * @return  {string}    处理后的参数值
 */
function cleanParam(paramV){
    return paramV
}

/**
 * 注意：自定义文件的最后必须加这句
 * 否则会调用失败
 * @type {{handle: (function(*, *=): *)}}
 */
module.exports = {
    handle :handle
};