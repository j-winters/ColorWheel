#!flask/bin/python

import sys

import time

import os

import string

import ast

from flask import Flask, render_template, request, redirect, Response, url_for, jsonify
import random, json

app = Flask(__name__)

@app.route('/')
def signUp():
	return render_template('consent.html')

@app.route('/index.html')
def index():
	return render_template('index.html')

@app.route('/postmethod', methods=['POST','GET'])
def get_post_javascript_data():
	global python_data, user
	full = ['rgb(43, 238, 235)', 'rgb(43, 218, 238)', 'rgb(43, 202, 238)', 'rgb(43, 183, 238)', 'rgb(43, 163, 238)', 'rgb(43, 140, 238)', 'rgb(43, 117, 238)', 'rgb(43, 98, 238)', 'rgb(43, 72, 238)', 'rgb(101, 43, 238)', 'rgb(153, 43, 238)', 'rgb(196, 43, 238)', 'rgb(235, 43, 238)', 'rgb(238, 43, 186)', 'rgb(238, 43, 144)', 'rgb(238, 43, 111)', 'rgb(238, 43, 82)', 'rgb(238, 43, 49)', 'rgb(238, 78, 43)', 'rgb(238, 108, 43)', 'rgb(238, 130, 43)', 'rgb(238, 150, 43)', 'rgb(238, 170, 43)', 'rgb(238, 192, 43)', 'rgb(238, 215, 43)', 'rgb(231, 238, 43)', 'rgb(192, 238, 43)', 'rgb(137, 238, 43)', 'rgb(43, 238, 75)', 'rgb(43, 238, 137)', 'rgb(43, 238, 179)', 'rgb(43, 238, 209)']
	jsdata = request.form['javascript_data']
	blah = json.loads(jsdata)
	l = [blah[i] for i in blah]
	user_id = l.pop(0)
	user = {"name":user_id}
	blah.pop('name')
	file = open(str(user_id)+'.txt',"a")
	file.close()

	file = open(str(user_id)+".txt","r")
	f1 = file.readlines()

	if f1 == []:
		stored = []
		file = open(str(user_id)+".txt","a")
		file.write(str(blah)+'\n')
		file.close()
	else:
		file = open(str(user_id)+".txt","r")
		f2 = file.readlines()
		stored = [x for x in f2]
		file = open(str(user_id)+".txt","a")
		file.write(str(blah)+'\n')
		file.close()
		stored = [ast.literal_eval(i) for i in stored]
		new = []
		for i in range(len(stored)):
			data = stored[i]
			for j in data:
				new.append(data[j])
		stored_flat = [item for sublist in new for item in sublist]

	data_flat = [item for sublist in l for item in sublist]

	if stored == []:
		flat_list = data_flat
	if stored != []:
		flat_list = stored_flat + data_flat

	listical = set(full) - set(flat_list)

	if list(listical) != []:

		changed = [i.replace('rgb(','') for i in list(listical)]
		changed = [i.replace(')','') for i in changed]
		changed =[[i] for i in changed]

		result = []
		for i in changed:
			a = "%s" % ",".join(i)
			b = a.split(',')
			c = [int(x) for x in b]
			result.append(c)
		python_data = [{'rgb': value} for value in result]
		return jsonify(python_data)
	else:
		python_data = {'finish':'terminate'}
		return redirect(url_for('finish'))

@app.route('/getpythondata')
def get_python_data():
	time.sleep(0.5)
	return jsonify(python_data)

@app.route('/finish.html')
def finish():
    return render_template('finish.html')