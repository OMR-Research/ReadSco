BLUE='\033[1;34m'
GREEN='\033[1;32m'
RED='\0;31[1;32m'
NC='\033[0m' # No Color
printf "Welcome to\n"
printf "\n"
printf "██████╗ ███████╗ █████╗ ██████╗ ███████╗ ██████╗ ██████╗\n" 
printf "██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔═══██╗\n"
printf "██████╔╝█████╗  ███████║██║  ██║███████╗██║     ██║   ██║\n"
printf "██╔══██╗██╔══╝  ██╔══██║██║  ██║╚════██║██║     ██║   ██║\n"
printf "██║  ██║███████╗██║  ██║██████╔╝███████║╚██████╗╚██████╔╝\n"
printf "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ \n"
printf "\n"
printf "${BLUE} CHECKING OUT DEPENDENCIES ${NC} \n"

printf "NodeJS - "
command -v node >/dev/null 2>&1 || { echo >&2 "NodeJS is required but not installed. Please, install it."; exit 1; }
printf "${GREEN} INSTALLED! ${NC} \n"

printf "NPM - "
command -v npm >/dev/null 2>&1 || { echo >&2 "NPM is required but not installed. Please, install it." ; exit 1; }
printf "${GREEN} INSTALLED! ${NC} \n"

printf "${BLUE} DOWNLOADING MODEL FILES ${NC}"
cd Backend/OMRFirstLayer/OMR
mkdir Config
cd Config
wget https://www.dlsi.ua.es//~jcalvo/data/Models/PrIMuS/Agnostic-Model.zip
unzip Agnostic-Model.zip
rm Agnostic-Model.zip
printf "${GREEN}DONE!${NC}\n"
printf "${BLUE} INSTALLING BACKEND DEPENDENCIES...${NC}\n"
cd ../../../TranslationHUB
command -v npm >/dev/null 2>&1 || { echo >&2 "Nodemon is not installed, but it is required. Installing it..." ; sudo npm install -g nodemon; }
command -v npm >/dev/null 2>&1 || { echo >&2 "Typescript is not installed, but it is required. Installing it..." ; sudo npm install -g typescript; }
sudo npm install
printf "${GREEN}INSTALLED!${NC}\n"
printf "${GREEN}READSCO IS READY TO LAUNCH IN DEVELOPMENT MODE!${NC}\n"
