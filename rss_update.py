# -*- coding: utf-8 -*-
"""
Created on Sat Apr 15 16:38:34 2017

@author: ZNevzz
"""

import urllib2

file = urllib2.urlopen('')

with open("rss_update.xml","wb") as rss:
    rss.write(file.read())
    
