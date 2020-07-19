<?php

  $obj = json_decode($_POST["x"], false);

  $square = $obj->square;
  $type =$obj->type;
  $material = $obj->material;
  $prepared = $obj->prepared;
  $extra = $obj->extra;
  $wallSquare = $obj->wallSquare;
  $fileName = $obj->fileName;
  $message = $obj->message;

  error_log("имя файла - ${fileName}", 3, "./log.txt");
  
  // Load Composer's autoloader
  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';
  
  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer\PHPMailer\PHPMailer();
  
  try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->CharSet = 'UTF-8';
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'repair.design277@gmail.com';                     // SMTP username
      $mail->Password   = 'Repair-design1';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
      $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  
      //Recipients
      $mail->setFrom('repair.design277@gmail.com', 'Евгений');
      $mail->addAddress('irishjimdegriz@gmail.com');     // Add a recipient
  
      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Новая заявка с сайта';
      $mail->Body    = "Площадь квартиры: ${square}. Тип работ: ${type}. Предпочитаемая фактура: ${material}. ${prepared}. Дополнительные услуги: ${extra}. Площадь стен: ${wallSquare}. Дополнительные пожелания: ${message}";

      $mail->AddAttachment($fileName);

      error_log(strlen($filename), 3, "./log.txt");
      if (strlen($filename) != 0) {
        error_log("непустое имя", 3, "./log.txt");
        //$mail->AddAttachment($fileName);
      }

      //error_log($mail->Body, 3, "./log.txt");
  
      //$mail->send();
      if($mail->send()) {

      }
      else {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
      }
      //header('Location: thanks.html');
  } catch (Exception $e) {
      echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
  }

?>