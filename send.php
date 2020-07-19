<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$_POST = json_decode(file_get_contents("php://input"), true);
// $_FILES = json_decode(file_get_contents("php://input"), true);

// Переменные, которые отправляет пользователь


// данные с форм
$name = $_POST['userName'];
$email = $_POST['userEmail'];
$phone = $_POST['userPhone'];
$val = $_POST['val'];
$checkbox = $_POST['policyCheckbox'];
$select = $_POST['select'];

// Данные с "Рассчитать стоимость"
$extra = $_POST['extra'];
$material = $_POST['material'];
$message = $_POST['message'];
$prepared = $_POST['prepared'];
$square = $_POST['square'];
$type = $_POST['type'];
$wallSquare = $_POST['wallSquare'];



// Данные с rating_form
$address = $_POST['address'];
$level = $_POST['level'];
$rooms = $_POST['rooms'];
$rooms = $_POST['rooms'];
$smsCheckbox = $_POST['smsCheckbox'];
$phoneCheckbox = $_POST['phoneCheckbox'];
$viberCheckbox = $_POST['viberCheckbox'];
$whatsappCheckbox = $_POST['whatsappCheckbox'];

$email = $email ? $email : '-';
$smsCheckbox = ($smsCheckbox == 'on') ? 'Да' : 'Нет';
$phoneCheckbox = ($phoneCheckbox == 'on') ? 'Да' : 'Нет';
$viberCheckbox = ($viberCheckbox == 'on') ? 'Да' : 'Нет';
$whatsappCheckbox = ($whatsappCheckbox == 'on') ? 'Да' : 'Нет';

$file = $_FILES['fileName'];

// $file = $file[1];

// Формирование самого письма
$title = "EUROFLEX";

$retVal = "
<h2>Рассчитать стоимость</h2>
<b>Площадь дома:</b> $square<br>
<b>Тип работ:</b> $type<br>
<b>Фактура:</b> $material<br>
<b>Доп. услуги:</b> $extra<br>
<b>Примерная площадь стен</b> $wallSquare<br>
<b>Поверхность:</b> $prepared<br><br>
<b>Особые пожелания</b> $message<br><br>
";


$retForm = "
<h2>$val</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
<b>Почта:</b> $email<br><br>
<b>Согласие на обработку данных:</b> $checkbox<br><br>

";

$retRatForm = "
<h2>Оценка объекта</h2>
<b>Адрес объекта:</b> $address<br>
<b>Общая площадь:</b> $square<br>
<b>Количество комнат:</b> $rooms<br>
<b>Этажей:</b> $level<br>
<b>Телефон:</b> $phone<br><br><br>
<b>Удобный способ связи:</b><br>
<b>Sms:</b> $smsCheckbox<br>
<b>Телефон:</b> $phoneCheckbox<br>
<b>Viber:</b> $viberCheckbox<br>
<b>Whatsapp:</b> $whatsappCheckbox<br>
";



if($select == 0){
  $body = $retForm;
}elseif ($select == 1) {
  $body = $retVal;
}else 
   $body = $retRatForm;



// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'XXXXXXX'; // Логин на почте
    $mail->Password   = 'XXXXXX'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('XXXXXX@mail.ru', 'XXXXX'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('XXXXXXXX');  
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}


// echo "$_POST";
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

