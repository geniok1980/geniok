
var TelegramBot = require('node-telegram-bot-api');
var request = require('request')
var cheerio = require('cheerio')
var token = '155871338:AAGoyU3pipTu_LjtNo4QhNsoVAnIByASGow';
var bot = new TelegramBot(token, { polling: true });
var port = process.env.PORT || 1337;
//var Entities = require('html-entities').AllHtmlEntities;
//var entities = new Entities();
//var curl = require('node-curl');
var usrlogin = 'admin';
var usrpass = 'resto#test';//'resto#test' dbBUbPQ6bGpINlHSSUL7
//var usrpasshash = sha1(usrpass);
var param1 = 'PayTypes';
var param2 = 'GuestNum';
var param3 = 'DishDiscountSumInt.averageByGuest';
var param4 = 'DishDiscountSumInt';
var param5 = 'UniqOrderId';
//var today = '05.02.2017';
//var from = 'info@itsoft24.ru';
//var subject = 'Отчет о продажах за '.$date;
//var port = '8020'; //8020  8103
//var ip = '138.201.33.184';
var sha1 = require('sha1');
//var data = [];

//function getdata(url)
//{
//request(url, function (error, response, body));
var Data = new Date();
 var Year = Data.getFullYear();
 var Month = ('0'+parseInt(Data.getMonth()+1)).slice(-2);
 var Day = ('0'+Data.getDate()).slice(-2);
//var today = document.write(Day+'.'+Month+'.'+Year);
//console.log(Day+'.'+Month+'.'+Year);
var today = String(Day+'.'+Month+'.'+Year);

var deltoday = String(Year+'-'+Month+'-'+Day);
//console.log(today);
//console.log(deltoday);
//}
    
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest();
//var xml2js = require('xml2js');
//var parser = new xml2js.Parser();
//var = result
//var = body;
//var = result;



  // отправляем сообщение в чат
  bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  //console.log(msg);

  switch (msg.text) {
    case '/start':
      start(chatId);
    break;
    case 'Вход':
      work(chatId);
    break;
    case 'Foodcost':
      bot.sendMessage(chatId, 'Введите логин');
      work(chatId)
    break;
    case 'Отчет по удалениям':
     // bot.sendMessage(chatId, 'Реквизиты компании');
    // bot.sendDocument(chatId, 'price.xls');
      deleteOrder(chatId);
    break;
    case 'Текущая выручка':
    //console.log("1");
     //bot.sendMessage(chatId, 'Вы видите кубок!');
     iiko(chatId);
    break;
    
  }
});
  function iiko(chatId) {
    //var urlLogin = 'http://138.201.33.184:8020/resto/api/auth?login=admin&pass='+sha1('resto#test');
   // var request = require('request');


   //$urlData = 'http://'.$ip.':'.$port.'/resto/api/reports/olap?key='.$key.'&report=SALES&from='.$date.'&to='.$date..$param1.'&agr='.$param2.'&agr='.$param3.'&agr='.$param4.'&agr='.$param5;
    request("http://138.201.33.184:8020/resto/api/auth?login=admin&pass=" + sha1("resto#test"), function (error, response, key) {
    if (!error && response.statusCode == 200) {
   // console.log("1234") // Show the HTML for the Google homepage. 
    request('http://138.201.33.184:8020/resto/api/reports/olap/?key='+key+'&report=SALES&from='+today+'&to='+today+'&groupRow='+param1+'&agr='+param2+'&agr='+param3+'&agr='+param4+'&agr='+param5, function (error, response, body) {
   // console.log(body)
   // console.log("2")
    var $ = cheerio.load(body, {
    normalizeWhitespace: true,
    xmlMode: true

});
    //var data = $('fullSum').text();
    var sumdata = [];
    var paydata = [];

$('DishDiscountSumInt').each(function(i, elem) {
  sumdata[i] = $(this).text();
  //console.log(data[i])
  //bot.sendMessage(chatId, 'Сумма '+Math.floor(sumdata[i])+' руб.');
});
$('PayTypes').each(function(i, elem) {
  paydata[i] = $(this).text();
  console.log(paydata[i])
  bot.sendMessage(chatId, paydata[i]+' '+Math.floor(sumdata[i])+' руб.');
});

//data.join(', ');
    
  if (!error && response.statusCode == 200) {
    //console.log("херня")
    //console.log(data[1]) 
      request('http://138.201.33.184:8020/resto/api/logout?key='+key, function (error, response, logout) {
  if (error && response.statusCode != 200) {

    //console.log("3") // Show the HTML for the Google homepage. 
  }
})
    // Show the HTML for the Google homepage. 
  }
})
  }
})
   
   
 } 
// ---------------------------------------------------------------------------------

function deleteOrder(chatId) {
    //var urlLogin = 'http://138.201.33.184:8020/resto/api/auth?login=admin&pass='+sha1('resto#test');
   // var request = require('request');

    //var name = [];
    var value = [];
    var sum = 0;
   //$urlData = 'http://'.$ip.':'.$port.'/resto/api/reports/olap?key='.$key.'&report=SALES&from='.$date.'&to='.$date..$param1.'&agr='.$param2.'&agr='.$param3.'&agr='.$param4.'&agr='.$param5;
    request("http://138.201.33.184:8020/resto/api/auth?login=admin&pass=" + sha1("resto#test"), function (error, response, key) {
    if (!error && response.statusCode == 200) {
    console.log("1") // Show the HTML for the Google homepage. 
    request('http://138.201.33.184:8020/resto/api/events/?key='+key+'&from_time='+deltoday+'T00:00:00.000&to_time='+deltoday+'T23:59:59.999', function (error, response, body) {
    console.log(body)
    var $ = cheerio.load(body, {
    normalizeWhitespace: true,
    xmlMode: true

    
});
    //var data = $('fullSum').text();
    //var type = $()
    
   // var  = [];
    
   // var type = [];
    //var array=[];

//console.log($('type').text())
//if($('type').text()=="deletedPrintedItems"){

$('attribute').each(function(i, elem){
  //if (type[i]==="eletedPrintedItems"){
    //console.log($(this).find('type').text())
    if($(this).parent().find('type').text()=="deletedPrintedItems"){
 if($(this).find('name').text()=="rowCount"){ 
  //if($(this).children().find('name').text()=="rowCount"){
    value[i] = parseInt($(this).find('value').text());
  // var sum += name[i];
   sum += value[i];
  //bot.sendMessage(chatId, name[i]);
  
//}
}
}


});
//console.log(name[1])
//var sum = 0;
//for(var i = 0; i < name.length; i++){
    //sum += name[i];
    //}
   // console.log('Кол-во удалений '+sum);
    //}
    
  if (!error && response.statusCode == 200)    {
    console.log("2")
    //console.log(data[1]) 
      request('http://138.201.33.184:8020/resto/api/logout?key='+key, function (error, response, logout) {
        console.log("3")
        console.log('Кол-во удалений '+sum);
        bot.sendMessage(chatId, "Кол-во удалений = "+(sum));  
      //  bot.sendMessage("Кол-во удалений = "+sum); 

  if (error && response.statusCode != 200) {
    console.log("4")

                                           }
})
    // Show the HTML for the Google homepage. 
  }
})
  }
})
   
 
 } 

function start(chatId) {
  bot.sendMessage(chatId, 'Сегодня у нас '+today, {
    reply_markup: JSON.stringify({
      keyboard: [
        [{
          text: 'Вход',
          callback_data: '147'
        }],
        ]
    })
  });
  //work(chatId);
}

function work(chatId){
  bot.sendMessage(chatId, 'Сегодня у нас'+today, {
    reply_markup: JSON.stringify({
      keyboard: [
        [{
          text: 'Отчет по удалениям',
          callback_data: '146'
        }],
        [{
          text: 'Текущая выручка',
          callback_data: '151'
        }]]
    })
  });
}

