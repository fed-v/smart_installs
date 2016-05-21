<?php
	if($_POST)
	{

		$to_Email   	= "fed_v@hotmail"; //Replace with recipient email address
		$subject        = 'Message from website'; //Subject line for emails


		//check $_POST vars are set, exit if any missing
		if(!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["enquiry"]))
		{
			header('Location: ../index.php?error=1');
		}

		//Sanitize input data using PHP filter_var().
		$user_Name        = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
		$user_Email       = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
		$user_Message     = filter_var($_POST["enquiry"], FILTER_SANITIZE_STRING);

		$user_Message = str_replace("\&#39;", "'", $user_Message);
		$user_Message = str_replace("&#39;", "'", $user_Message);


		// Validate Fields





		//proceed with PHP email.
		/*$headers = 'From: '.$user_Email.'' . "\r\n" .
		'Reply-To: '.$user_Email.'' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

		$sentMail = @mail($to_Email, $subject, $user_Message . "\r\n\n"  .'-- '.$user_Name. "\r\n" .'-- '.$user_Email, $headers);

		if(!$sentMail)
		{
			header('Location: ../index.php?error=1');
		}else{
			header('Location: ../index.php');
		}*/


		// User Found, Send email
		//$MBody = "<p>Your password hint is:".$row['passwordHint']."</p>\n";

	   $headers .= "MIME-Version: 1.0\r\n";
	   $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


	   //$sendto = $row['username'];

	   //$subject = "Login information";

	   if(mail($to_Email, $subject, $user_Message, $headers)){
		   header('Location: ../index.php');
	   } else {
		   header('Location: ../index.php?error=1');
	   }

	}
?>
