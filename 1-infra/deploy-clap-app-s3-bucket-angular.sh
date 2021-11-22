#!/usr/bin/env bash
set -e 

# hae exportatun userin credenttiaalit
ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)

# Application specific variables
# TARGET ACCOUNT ID GRAAIFNEN KÄYTTÖLIITTYMÄ NIMEN JÄLKEEN. VIIVAT POIS
TARGET_ACCOUNT_ID="177244120069"
REGION="eu-west-1"

TEMPLATE_FILE="clap-app-s3-bucket-angular.yaml"
# cloudformation stack name. näkyy graafisest liittymästä
STACK_NAME="clap-app-s3-bucket-angular"
BUCKET_NAME="clap-app-angular"

if [ "$TARGET_ACCOUNT_ID" != "$ACCOUNT_ID" ]; then
    echo "Incorrect account"
    exit 1
fi



aws cloudformation deploy \
  --stack-name "$STACK_NAME"  \
  --template-file "${TEMPLATE_FILE}" \
  --region "$REGION" \
  --parameter-overrides BucketName="$BUCKET_NAME"




#   JOS ei anna ajaa muista vaihtaa chmod 700