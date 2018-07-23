# encoding:utf-8
# 将已完成的方法转移到这里
# create by ye jiaquan in 2018/07/23
import hashlib
import time


# editing(正在开发)
# 环境配置
# create by ye jiaquan in 2018/07/18
#         修改时间                      修改原因
# 2018/07/19 by ye jiaquan     将零散的设置整合到settings里
settings = {
    'headers': {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    'appName': '/openapi',
    'sysSetting': {'user': 'tdtest', 'pwd': '1qaz@WSX'},
    'openapi_dev': {'ip': 'localhost', 'port': '8080'},
    'openapi_prod': {'ip': 'aladdin.zj.chinamobile.com', 'port': '80'},
    'openapi_test': {'ip': '10.70.194.177', 'port': '80'},
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
    # print('sys(' + settings['sysSetting']['user'] + '):' + str(sys[settings['sysSetting']['user']]))


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
                    'sendContent': '百度一下，你就知道${var1}',
                    'sendStartDate': '2018-08-01',
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
