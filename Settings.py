# encoding:utf-8
# 将已完成的方法转移到这里
# create by ye jiaquan in 2018/07/23
import hashlib
import time
import yaml


class Settings:
    def __init__(self, name):
        with open(name, "r") as yaml_file:
            self.settings = yaml.load(yaml_file.read())

    # done(开发完成)
    # 自动生成sys
    # create by ye jiaquan in 2018/07/19
    def autoSys(self, signUser):
        millis = int(round(time.time() * 1000))
        settings = self.settings['settings']
        sys = self.settings['sys']
        strs = "%s&%s&%s&%s&%s&%s" % (millis, settings['sysSetting'][signUser], sys[signUser]['city'],
                                      sys[signUser]['county'], sys[signUser]['industry'],sys[signUser]['appkey'])
        sys[signUser]['timestamp'] = str(millis)
        sys[signUser]['sign'] = hashlib.md5(strs.encode('utf-8').lower()).hexdigest()
