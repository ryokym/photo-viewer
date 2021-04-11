#!bin/bash
aws --profile $1 s3 mb s3://$2
aws --profile $1 s3api put-public-access-block --bucket $2 --public-access-block-configuration  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
cd `dirname $0`
cat <<EOF > policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$2/*"
    }
  ]
}
EOF
aws --profile $1 s3api put-bucket-policy --bucket $2 --policy file://policy.json
rm ./policy.json
aws --profile $1 s3 website s3://$2 --index-document index.html --error-document index.html

if [ -d dist ]; then
    aws --profile $1 s3 cp ./dist s3://$2 --recursive
    region=`aws configure --profile private get region`
    echo "App running at: http://$2.s3-website-$region.amazonaws.com"
fi
