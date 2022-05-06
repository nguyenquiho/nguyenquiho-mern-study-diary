function doHomeWork(ten, callback) {
        
        setTimeout(function () {
            console.log(`Dang lam bai tap ${ten}`)
            mess = 'da lam xong';
            callback(mess);
        }, 3000)
        // setTimeout(function () {
            
        // })
    
}

doHomeWork('toan', (data) => {
    console.log(data)
});