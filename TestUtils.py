# encoding:utf-8
# 将已完成的方法转移到这里
# create by ye jiaquan in 2018/07/23
import urllib
import urllib2
import random
import Settings as st


# done(开发完成)
# get 方法
# 自动调用
# create by ye jiaquan in 2018/07/18
def get(url, data, headers):
    data = urllib.urlencode(data)
    req = urllib2.Request(url='%s%s%s' % (url, '?', data), headers=headers)
    res = urllib2.urlopen(req)
    return res.read()


# done(开发完成)
# post 方法
# 自动调用
# create by ye jiaquan in 2018/07/18
def post(url, data, headers):
    data = urllib.urlencode(data)
    req = urllib2.Request(url, data, headers)
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor())
    response = opener.open(req, data)
    return response.read()


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
    print('-----------------------------------------------------------------------------------------------------------')
    return space


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
    settings = st.Settings()
    set = settings.settings
    settings.autoSys()
    url = 'http://' + str(set['settings'][setting]['ip']) + ':' + str(set['settings'][setting]['port']) +\
          str(set['apis'][api]['url'])
    set['apis'][api]['body']['sys'] = set['sys'][set['settings']['sysSetting']['user']]
    for i in edit:
        set['apis'][api]['body'][i] = edit[i]
    print('请求方式：' + set['apis'][api]['type'] + '，测试URI：' + url)
    print('请求参数：')
    for i in set['apis'][api]['body']:
        print "%s:%s" % (i, set['apis'][api]['body'][i])
    if set['apis'][api]['type'] == 'post':
        return post(url, set['apis'][api]['body'], set['settings']['headers'])
    else:
        return get(url + set['apis'][api]['body']['param'], set['apis'][api]['body'], set['settings']['headers'])
