const investmentTypes = {
    'S&P 500': {
        rates: [.118, .121, .109, .119],
        risk: .0175    
    },
    'US Small-Cap': {
        rates: [.094, .099, .089, .090],
        risk: .017    
    },
    'Real-Estate': {
        rates: [.10, .105, .109, .098],
        risk: .075    
    },
    'Bond': {
        rates: [.03, .04, .033, .037],
        risk: .04    
    },
};

module.exports = investmentTypes;