export const event = {
    "Records": [
        {
            "eventID": "450ec9ec1ab04e8c106054d6e78c0759",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1639511266,
                "Keys": {
                    "id": {
                        "S": "profile-images/9d3ae1d6-66cd-4a1f-a01e-161b756083b1-profile4.jpg"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1639511266161"
                    },
                    "s3Key": {
                        "S": "profile-images/9d3ae1d6-66cd-4a1f-a01e-161b756083b1-profile4.jpg"
                    },
                    "imageUrl": {
                        "S": "https://d10652efg91yd7.cloudfront.net/profile-images/9d3ae1d6-66cd-4a1f-a01e-161b756083b1-profile4.jpg"
                    },
                    "name": {
                        "S": "profile4.jpg"
                    },
                    "id": {
                        "S": "profile-images/9d3ae1d6-66cd-4a1f-a01e-161b756083b1-profile4.jpg"
                    },
                    "mimeType": {
                        "S": "image/jpeg"
                    },
                    "userId": {
                        "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
                    }
                },
                "SequenceNumber": "25216600000000076581433972",
                "SizeBytes": 404,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-profile-images/stream/2021-12-09T09:47:09.066"
        }
    ]
}