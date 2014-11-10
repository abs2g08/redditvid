#!/bin/bash
# Script to quickly build and run the app

ember build
node node_server/server.js
