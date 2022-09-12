 commitType=$(cat commit-types | fzf --height 40% | awk '{print $1}') 
 commitType=$(echo $commitType | sed 's/ //g') 
 commitScope=$(cat commit-scopes | fzf -m --height 40% |awk '{printf "%s ,",$0} END {print ""}' ) 
 commitScope=$(echo $commitScope | sed 's/,$//g') 
 commitScope=$(echo $commitScope | sed 's/ //g') 
 commitScope=$(echo $commitScope | sed 's/\n//g') 
 title=$(echo $commitType "(" $commitScope ")") 
 title=$(echo $title | sed 's/ //g') 
 message=$1 
if [ -z "$message" ]
then
	echo "Enter commit message: "
	read message
fi
 commit=$(echo $title": "$message) 
 isCorrect="n" 
echo "Are you sure you want to commit? (y/n)"
read isCorrect
isCorrect=$(echo $isCorrect | sed 's/ //g') 
if [[ "$isCorrect" = "y" ]]
then
	echo "🚀🚀🚀🚀🚀 Committing $commit"
	git commit -m "$commit"
else
	echo "Commit canceled"
fi


