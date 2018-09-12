if [ "${CIRCLE_BRANCH}" == "master" ]; then
    curl -X POST --data-urlencode "payload={\"text\": \"<!here> Master is failing!!!\"}" $VAC_FIRE_BREAK_SLACK_URL
fi
