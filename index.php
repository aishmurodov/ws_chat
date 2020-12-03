<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>

    <div class="container">
        <div class="my-3 p-3 bg-white rounded" style="height: 71vh;">
            <h2 class="pb-2 mb-0">Чат</h2>
            <h6 class="pb-2 mb-0">Статус: <span class="connection_status"></span></h6>
            <div class="messages_container" style="overflow-y: auto;height: 95%"></div>
        </div>
        <form class="message_form my-3 p-3 bg-white rounded">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Текст сообщения</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="form-group text-right">
                <button type="submit" class="btn btn-primary mb-2">Отправить</button>
            </div>
        </form>
    </div>


    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="app.js"></script>
</body>
</html>