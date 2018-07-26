var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.PORT = 3000;
    //Other development profile settings
}else if (env === 'test'){
    process.env.PORT = 3000;
    //Other test profile settings
}