# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18

import random
import time
import hashlib
import urllib
import urllib2

# editing(正在开发)
# 环境配置
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     将零散的设置整合到settings里
settings = {
    'headers': {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    'appName': '/openapi',
    'sysSetting': {'user': 'tdtest', 'pwd': '1qaz@WSX'},
    'dev': {'ip': 'localhost', 'port': '8080'},
    'prod': {'ip': 'aladdin.zj.chinamobile.com', 'port': '80'},
    'test': {'ip': '10.70.194.177', 'port': '80'},
    'ssss': {'ip': '10.78.235.38', 'port': '31091'},
    'sss': {'ip': '10.70.62.16', 'port': '8080'}
}

# editing(正在开发)
# 环境配置
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     将sign密码转移到settings中配置
sys = {
    'tdtest':
        {
            'appkey': 'tdtest',
            'timestamp': '1531971058962',
            'city': '571',
            'county': '571A',
            'industry': '01',
            'sign': 'a381dbb4735f7c255a25e65298f48325'
        }
}


# done(开发完成)
# 自动生成sys
# create by ye jiaquan in 2018/07/19
def autoSys():
    millis = int(round(time.time() * 1000))
    strs = str(millis) + "&" + \
           str(settings['sysSetting']['pwd']) + "&" + \
           str(sys[settings['sysSetting']['user']]['city']) + "&" + \
           str(sys[settings['sysSetting']['user']]['county']) + "&" + \
           str(sys[settings['sysSetting']['user']]['industry']) + "&" + \
           str(sys[settings['sysSetting']['user']]['appkey'])
    sys[settings['sysSetting']['user']]['timestamp'] = str(millis)
    sys[settings['sysSetting']['user']]['sign'] = hashlib.md5(strs.encode('utf-8').lower()).hexdigest()
    print('sys(' + settings['sysSetting']['user'] + '):' + str(sys[settings['sysSetting']['user']]))


# done(开发完成)
# 随机生成价格
# @s 起始(double 类型
# @p 结束(double 类型
# @return (double 类型
# create by ye jiaquan in 2018/07/19
def randomPrice(s=0.0, p=5.0):
    if p < s:
        print('结束参数小于起始参数')
        return 0.00
    return "%.2f" % random.uniform(s, p)


# editing(正在开发)
# apis
# 配置模板示例:
# 'api名称':
#     {
#         'type': 'get',
#         'url': settings['appName'] + 'api链接',
#         'body':
#             {
#                 '参数名': '参数值'
#                    .        .
#                    .        .
#                    .        .
#             }
#         type为get是必传，若是不需要请传入空字符串
#         'param': '参数名=参数值&参数名=参数值&...'
#     }
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     增加传入type(请求类型)，param(get类型的后缀参数)
apis = {
    '新建模板':
        {
            'type': 'post',
            'url': settings['appName'] + '/template/new',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']],
                    'channelId': 'SMSPAAS',
                    'modelTitle': '喜传单',
                    'modelSign': '喜传单',
                    'location': '0',
                    'modelContent': '2M微端，2秒下载！2018最经典传奇终于回归！装备全爆端游品质！{$var1}，退订回T'
                }
        },
    '新建活动':
        {
            'type': 'post',
            'url': settings['appName'] + '/activities/new',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']],
                    'channelId': 'CMPP',
                    'actName': 'test9999',
                    'cgpId': '339',
                    'contentType': '1',
                    'sendContent': 'd2f0ed49-2a73-40ec-85c2-01d4100b67a9',
                    'sendCnt': '999',
                    'sendMethod': '1',
                    'triggerCon': '2018-07-27 11:08:00',
                    'fromNo': '10658618999',
                    'isBid': 'Y'
                }
        },
    '新建竞价活动':
        {
            'type': 'post',
            'url': settings['appName'] + '/activities/bid/new',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']],
                    'busiId': '2',
                    'actName': '百度',
                    'sendContent': '百度一下，你就知道{$var1}',
                    'sendStartDate': '2018-07-01',
                    'sendEndDate': '2018-08-01',
                    'sendStartTime': '08:00:00',
                    'sendEndTime': '23:59:59',
                    'limitAmt': '10000',
                    'price': '0.01',
                    'isRealtime': '1',
                    'originUrl': 'https://www.baidu.com',
                    'ruleStr': '#98260<20',
                    'sites': '[{"opera":"or","latitude":"30.321228350169445","ptype":"all","radius":"1000",'
                             '"longitude":"120.0681886350031"}] '
                }
        },
    '修改竞价状态':
        {
            'type': 'post',
            'url': settings['appName'] + '/activities/bid/status/modify/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']],
                    'actId': '104',
                    'status': 'cancel'
                }

        },
    '修改竞价价格':
        {
            'type': 'post',
            'url': settings['appName'] + '/activities/bid/price/modify/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']],
                    'price': '0.01',
                    'actId': '104'
                }
        },
    '查询竞价结果':
        {
            'type': 'get',
            'url': settings['appName'] + '/activities/bid/result/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']]
                },
            'param': '104'
        },
    '查询实时竞价结果':
        {
            'type': 'get',
            'url': settings['appName'] + '/activities/bid/current/result/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']]
                },
            'param': '104'
        },
    '查询竞价状态':
        {
            'type': 'get',
            'url': settings['appName'] + '/activities/bid/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']]
                },
            'param': '104'
        },
    '洞察类':
        {
            'type': 'get',
            'url': settings['appName'] + '/activities/result/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']]
                },
            'param': '194'
        },
    '查询标签信息':
        {
            'type': 'get',
            'url': settings['appName'] + '/tags/',
            'body':
                {
                    'sys': sys[settings['sysSetting']['user']]
                },
            'param': 'LG02'
        }
}


# done(开发完成)
# post 方法
# 自动调用
# create by ye jiaquan in 2018/07/18
def post(url, data):
    data = urllib.urlencode(data)
    req = urllib2.Request(url, data, settings['headers'])
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor())
    response = opener.open(req, data)
    return response.read()


# done(开发完成)
# get 方法
# 自动调用
# create by ye jiaquan in 2018/07/18
def get(url, data):
    data = urllib.urlencode(data)
    req = urllib2.Request(url='%s%s%s' % (url, '?', data), headers=settings['headers'])
    res = urllib2.urlopen(req)
    return res.read()


# editing(正在开发)
# 自动拼接apiUrl
# @setting  服务器配置名
# @api      接口配置名
# @edit     需要实时修改的参数变量
#           参数类型为数组，数组中为set
#           set的第一个参数名为paramKey，参数值为需要修改的变量名
#           第二个参数名为paramValue，参数值为修改的变量值
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     删除传入sign参数，将自动生成sys放进此方法
def selectApi(setting, api, edit):
    autoSys()
    url = 'http://' + settings[setting]['ip'] + ':' + settings[setting]['port'] + apis[api]['url']
    for _ in range(len(edit)):
        apis[api]['body'][edit[_]['paramKey']] = edit[_]['paramValue']
    print('测试URI：' + url)
    if apis[api]['type'] == 'post':
        return post(url, apis[api]['body'])
    else:
        return get(url + apis[api]['param'], apis[api]['body'])


# done(开发完成)
# 输出时间
# @desc     输出信息描述
# @start    开始时间戳   (默认为0
# @stop     结束时间戳   (默认为0
# @space    时间间隔     (默认为0
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     增加desc和space参数，增加可读性
def logTimeConsum(desc, start=0, stop=0, space=0):
    if space == 0 and start != 0 and stop != 0:
        space = stop - start
    ms = space % 1000
    ss = (space / 1000) % 60
    mi = (space / 1000) / 60
    print(desc + str(mi) + ' min ' + str(ss) + ' s ' + str(ms) + ' ms')
    return space


# 主方法
if __name__ == '__main__':
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    # 测试设置列表
    tests = [
        # ['test', '新建竞价活动', []],
        # ['prod', '修改竞价状态', []],
        ['test', '修改竞价价格', [{'paramKey': 'price', 'paramValue': ''}]],

        ['test', '新建模板', []],
        ['test', '新建活动', []],
        ['test', '新建竞价活动', []],
        ['test', '修改竞价状态', []],
        ['test', '修改竞价价格', []],
        ['test', '查询竞价结果', []],
        ['test', '查询实时竞价结果', []],
        ['test', '查询竞价状态', []],
        ['test', '洞察类', []],
        ['test', '查询标签信息', []]
    ]

    # 多个api测试多次
    # size = len(tests)
    # 单个api测试多次
    size = 10
    for _ in range(size):
        # 自定义参数
        # if _ == 0:
        tests[0][2][0]['paramValue'] = randomPrice(0.00, 3.00)
        # 设置开始计时时间
        start = int(round(time.time() * 1000))
        # 多个api测试多次
        # result = selectApi(tests[_][0], tests[_][1], tests[_][2])
        # 单个api测试多次
        result = selectApi(tests[0][0], tests[0][1], tests[0][2])
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        space = logTimeConsum('耗时：', start, stop)
        if _ == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space
        print(result)

    logTimeConsum('总耗时：', space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    logTimeConsum('去最值平均耗时：', space=(t - max - min) / (size - 2))
