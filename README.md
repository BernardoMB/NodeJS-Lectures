NodeJS Lectures about NodeJS using JavaScript (TypeScript), Html, CSS, and more.

## Git

git init (inicializa un repositorio local)
git status (indica el estatus del repositorio con respecto a cambios locales o en la nube)
git add <nombre_del_archivo> (agrega al area de staging el archivo)
git add . (agrega todos los cambios al area de staging)
git commit -m "Algun mensage" (toma una fotografia del estado actual del los archivos)
git remote add (agrega un remote [nube] al repositorio local. Crea una liga entre el repositorio local y la nube)
git push (sube cambios de la current branch a la upstream branch de la nube)
git push --set-upstream origin master (sube cambios de la current branch a la upstream branch de la nube especificando a origin master como la upstream branch)
git push origin master (sube cambios a la rama especificada [origin master])
git pull (baja cambios de la upstream branch en la nube)
git pull origin master (baja cambios de la nube de la rama especificada [origin master]) 
git fetch (hace que el repositorio local se entere de lo que paso en la nube)
git branch <nombre_de_la_rama> (crea una rama localmente con el nombre especificado)
git branch -v (muestra las ramas locales)
git branch -v -a (muestra las ramas locales y en el nube [de los remotes])
git checkout <nombre_de_la_rama> (cambiamos de rama)
git merge <nombre_de_la_rama> (mezcla los cambios de la rama especificada hacia la current branch)
