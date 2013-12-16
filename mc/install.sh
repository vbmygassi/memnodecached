# memcached requires libevent
cd /usr/local/src
curl -L -O http://cloud.github.com/downloads/libevent/libevent/libevent-2.0.17-stable.tar.gz
tar -xvzf libevent-2.0.17-stable.tar.gz
cd libevent-2.0.17-stable*
./configure
make
sudo make install
# Compile memcached utility
cd /usr/local/src
curl -L -O http://memcached.googlecode.com/files/memcached-1.4.13.tar.gz
tar -xvzf memcached-1.4.13.tar.gz
cd memcached-1.4.13*
./configure
make
sudo make install
# Create .bash_profile alias to start memcached as needed
alias m="memcached -d -m 24 -p 11211"
 
# Install autoconfig
cd /usr/local/src
curl -L -O http://gnu.mirrors.hoobly.com/gnu/autoconf/autoconf-2.69.tar.gz
tar xzf autoconf-2.69.tar.gz
cd autoconf-2.69
./configure --prefix=/usr/local
make
sudo make install
# Compile and copy memcached.so module
cd /usr/local/src
curl -O http://pecl.php.net/get/memcache-2.2.7.tgz
tar -xvzf memcache-2.2.7.tgz
cd memcache-2.2.7
phpize
./configure --enable-memcache
make
sudo make install
 
# If using MAMP
# cp modules/memcache.so /Applications/MAMP/bin/php/php5.3.6/lib/php/extensions/no-debug-non-zts-20090626/
# emacs /Applications/MAMP/bin/php/php5.3.6/conf/php.ini # add line: extension=memcache.so
 
# If using Apache2
# sudo emacs /etc/php.ini # add line: extension=memcache.so


