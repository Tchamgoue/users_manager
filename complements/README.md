-------------- CONFIGURATIONS -----------------

-Faire pour le backend:(# cd backend)
1-# composer update
2-# php artisan migrate (le nom de la BD est users_manager)
3-# php artisan passport:install
4-# php artisan generate:key
5-# php artisan db:seed --class=UsersTableSeeder
6-# php artisan serve

-Faire pour le frontend:(# cd frontend)
1- # npm install
2- # ng serve
 


*************** FONCTIONNALITES DEVELOPPEES ***************

Backend

- Authentification,
- Ajout d'un groupe
- Ajout, modification, suppression d'un utilisateur
- Lister utilisateurs (membres+administrateurs)


Frontend

- Lister les utilisateurs
- Ajouter un utilisateur
- Afficher détails d'un utilisateur