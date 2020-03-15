function GlobalVariables() {
    var jsonData;
    var jsonLength;
    var currentLine;

    return{
        initData: function(data){
            jsonData = data;
            jsonLength = data.length;
        },
        initLine: function(line){
            currentLine = line;
        },
        getData: function(){
            return jsonData;
        },
        getLength: function(){
            return jsonLength;
        },
        getCurrentLine: function(){
            return currentLine;
        }
    }
}

module.exports = GlobalVariables;