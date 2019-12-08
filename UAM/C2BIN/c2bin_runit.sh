#!/bin/bash
BASE_PATH=$(dirname $(realpath -s $0))
cd $BASE_PATH
php -d register_argc_argv=1 script_p.php
