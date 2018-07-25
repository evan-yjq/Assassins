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
        print "结束参数小于起始参数"
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
    time = "%s min %s s %s ms" % (mi, ss, ms)
    print desc % time
    return space


class TestInfo:
    def __init__(self, setting, signUser, api, edit):
        self.setting = setting
        self.signUser = signUser
        self.api = api
        self.edit = edit


class Utils:
    def __init__(self, name):
        self.settings = st.Settings(name)

    # editing(正在开发)
    # 自动拼接apiUrl
    # @setting  服务器配置名
    # @signUser sign用户名
    # @api      接口配置名
    # @edit     需要实时修改的参数变量
    #           参数类型为数组，数组中为set
    #           set的第一个参数名为paramKey，参数值为需要修改的变量名
    #           第二个参数名为paramValue，参数值为修改的变量值
    # create by ye jiaquan in 2018/07/18
    #         修改时间                      修改原因
    # 2018/07/19 by ye jiaquan     删除传入sign参数，将自动生成sys放进此方法
    def selectApi(self, setting, signUser, api, edit):
        set = self.settings.settings
        self.settings.autoSys(signUser)
        apis = set['apis']
        settings = set['settings']
        url = "http://%s:%s%s" % (settings[setting]['ip'], settings[setting]['port'], apis[api]['url'])
        apis[api]['body']['sys'] = set['sys'][signUser]
        for i in edit:
            apis[api]['body'][i] = edit[i]
        print "请求方式:%s,测试URI:%s," % (apis[api]['type'], url)
        print "请求参数:{"
        for i in apis[api]['body']:
            print "%s:%s," % (i, apis[api]['body'][i])
        print "},"
        if apis[api]['type'] == 'post':
            return post(url, apis[api]['body'], settings['headers'])
        else:
            return get(url + apis[api]['body']['param'], apis[api]['body'], settings['headers'])
