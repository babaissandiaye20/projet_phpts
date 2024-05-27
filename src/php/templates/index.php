<?php

include_once("../cargaison.html.php");
$Pages = array (
    "cargo" => "cargaison",
    "login" => "login",
);

$uri = isset($_REQUEST['page']) ? $_REQUEST['page'] : null;

include ('http://www.baba.issa.ndiaye:8024/projet_phpts/src/php/cargaison.html.php');


if (isset($uri)) {
    if (array_key_exists($uri, $Pages)) {
        
        include_once("src/php/$pages.php");
    }
   
} 
?>


