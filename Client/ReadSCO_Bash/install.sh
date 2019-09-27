BLUE='\033[1;34m'
GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

FILE=/Users/${USER}/.bash_profile
BINFOLDER=/Users/${USER}/bin
PATHTOBIN=/Users/${USER}

printf "Welcome to\n"
printf "\n"
printf "██████╗ ███████╗ █████╗ ██████╗ ███████╗ ██████╗ ██████╗\n" 
printf "██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔═══██╗\n"
printf "██████╔╝█████╗  ███████║██║  ██║███████╗██║     ██║   ██║\n"
printf "██╔══██╗██╔══╝  ██╔══██║██║  ██║╚════██║██║     ██║   ██║\n"
printf "██║  ██║███████╗██║  ██║██████╔╝███████║╚██████╗╚██████╔╝\n"
printf "╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ \n"
printf "\n"
printf "${BLUE}Bash application installer${NC}\n"

printf "${BLUE}Installing commands...${NC}\n"
cp -R bin ${PATHTOBIN}
printf "${GREEN}Installed!${NC}\n"

if test -f "$FILE"; then
    printf "${GREEN}$FILE exists${NC}\n"
else
    printf "${RED}$FILE does not exist${NC}\n"
    printf "${BLUE}Creating bash profile file${NC}\n"
    touch $FILE
    echo "export PATH=\$PATH:$BINFOLDER" >> '.bash_profile' 
fi

printf "${YELLOW}Installing commands${NC}\n"
printf "${GREEN}INSTALLED! ${NC}\n"
printf "${BLUE}Please restart your bash to start using the command line tool${NC}\n"

chmod u+x $BINFOLDER/*