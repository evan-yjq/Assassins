# encoding:utf-8
# 将已完成的方法转移到这里
# create by ye jiaquan in 2018/07/23
import urllib
import urllib2
import random
# import time
# import hashlib
import Settings as st
import sys

reload(sys)
sys.setdefaultencoding("utf8")


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
    res = opener.open(req, data)
    return res.read()


# done(开发完成)
# 随机生成价格
# @s 起始(double 类型
# @p 结束(double 类型
# @return (double 类型
# create by ye jiaquan in 2018/07/19
def randomPrice(s=0.0, p=5.0):
    if p < s:
        print "结束参数小于起始参数"
        return 0.00
    return "%.2f" % random.uniform(s, p)


# done(开发完成)
# 自动生成sys
# create by ye jiaquan in 2018/07/19
# def autoSys(signUser):
#     millis = int(round(time.time() * 1000))
#     setting = st.settings['settings']
#     sys = st.settings['sys']
#     strs = "%s&%s&%s&%s&%s&%s" % (millis, setting['sysSetting'][signUser], sys[signUser]['city'],
#                                   sys[signUser]['county'], sys[signUser]['industry'], signUser)
#     sys[signUser]['timestamp'] = str(millis)
#     sys[signUser]['sign'] = hashlib.md5(strs.encode('utf-8').lower()).hexdigest()


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
    time = "%s min %s s %s ms" % (mi, ss, ms)
    print desc % time
    return space


class TestInfo:
    def __init__(self, setting, api, edit):
        self.setting = setting
        self.api = api
        self.edit = edit


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
    set = st.settings
    api = set['apis'][str(api).decode('utf-8')]
    setting = set['settings'][str(setting).decode('utf8')]
    url = "http://%s:%s%s" % (setting['ip'], setting['port'], api['url'])
    for i in edit:
        api['body'][i] = edit[i]
    print '"请求方式":"%s","测试URI":"%s",' % (api['type'], url)
    print '"请求参数":{'
    outputs = []
    for i in api['body']:
        outputs.append('"%s":"%s"' % (i, str(api['body'][i]).encode('utf8').replace('"', "'")))
    print ','.join(outputs)
    print '},'

    try:
        if api['type'] == 'post':
            return post(url, api['body'], set['settings']['headers'])
        else:
            return get(url + api['body']['param'], api['body'], set['settings']['headers'])
    except urllib2.HTTPError, e:
        return e
    except urllib2.URLError:
        return '服务器地址无法访问'
