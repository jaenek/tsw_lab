<?php
if (isset($_POST['login']) && !isset($_SESSION)) {
  session_start();
  setcookie('username', $_POST['username'], time() + 15 * 86400, '/');
} else if (isset($_POST['logout']) && isset($_SESSION)) {
  session_destroy();
  setcookie('username', '', -1);
}
?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salon Samochodowy</title>
    <link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
</head>

<body>
    <header class="header">
        <svg height="100" width="250">
            <circle cx="50" cy="50" r="180" stroke="black" stroke-width="4" fill="#e9e8e7" />
            <text x="0" y="15" fill="red" transform="rotate(20 0,70)">SALON POLSKICH LEGEND</text>
        </svg>
    </header>

    <aside class="menu">
        <nav>
          <ul>
            <?php
              if (!isset($_SESSION)) {
				  echo '
                    <form method="post">
                      <li><input type="text" name="username"></input></li>
                      <li><button type="submit" name="login">Zaloguj</button></li>
                    </form>
                  ';
			  } else {
				  echo '
                    <form method="post">
                      <li>Witaj ' . $_COOKIE['username'] . '</li>
					  <li><button type="submit" name="logout">Wyloguj</button></li>
                    </form>
                  ';
			  }
            ?>
		  </ul>
          <ul>
            <a href="" onclick="changeLanguage('pl')"><li>Polski</li></a>
            <a href="" onclick="changeLanguage('en')"><li>English</li></a>
          </ul>
        </nav>
    </aside>

    <main class="main">
        <section>
            <h2>Samochody</h2>
            <table class="table models"></table>
        </section>

        <section>
            <h2 id="carousel-gallery">Galeria</h2>
			<div class="carousel slide">
			  <div class="carousel-inner" id="carousel-items">
				<div class="carousel-item active">
				  <img id="current-img">
				</div>
			  </div>
			  <a class="carousel-control-prev" href="#carousel-gallery" id="control-prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carousel-gallery" id="control-next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			  </a>
			</div>
        </section>

        <section class="video">
            <h2>Wideo</h2>
            <video width="400px" controls>
                <source src="Polish Fiat 126P - 12463.mp4" type="video/mp4">
            </video>
        </section>

        <section>
            <h2>Opinie</h2>
            <div class="opinions">
                <article class="opinion">
                    <h3>Opinia 1</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                    </p>
                </article>
                <article class="opinion">
                    <h3>Opinia 2</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                    </p>
                </article>
                <article class="opinion">
                    <h3>Opinia 3</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus cupiditate voluptatem
                        deserunt magnam odio quos distinctio suscipit sint nihil mollitia incidunt eos, quas obcaecati
                        a. Laborum harum est accusantium nobis?
                    </p>
                </article>
            </div>
        </section>

        <section>
            <h2>Sieć salonów</h2>
            <div id="map"></div>
            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVMG5B8JrvyGFtsYFDU9fJqfcgY4fwAT4&callback=initMap"
                async></script>
        </section>
    </main>


    <footer class="footer">
        <h2>Dane kontaktowe</h2>
        <div id="contact-info"></div>
        <hr>
        Liczba odwiedzin: <span id="visit-counter"></span>
        |
	    Jan Maślanka &copy; <script>document.write(new Date().getFullYear());</script>
    </footer>

    <script src="script.js"></script>
</body>

</html>
