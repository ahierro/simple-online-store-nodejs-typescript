import _ from 'lodash';

export const calculo = (cant) => {
    const randoms = {}

    for (let i = 0; i < cant; i++) {
        const random = _.random(1, 1000);
        if(randoms[random]){
            randoms[random] += 1;
        }else {
            randoms[random] = 1;
        }
    }
    return randoms;
};

process.on('message', (cant) => {
    const sum = calculo(cant);

    process.send({sum});
});
