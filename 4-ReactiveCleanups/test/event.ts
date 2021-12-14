export const event = {
    "Records": [
        {
            "eventID": "b34d8087d1cf2b1b84f2113a78d6947b",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1639510133,
                "Keys": {
                    "id": {
                        "S": "profile-images/8d95157e-4585-4db7-b7e7-69a47a2aac22-profile4.jpg"
                    }
                },
                "NewImage": {
                    "s3Key": {
                        "S": "profile-images/8d95157e-4585-4db7-b7e7-69a47a2aac22-profile4.jpg"
                    },
                    "imageUrl": {
                        "S": "https://d10652efg91yd7.cloudfront.net/profile-images/8d95157e-4585-4db7-b7e7-69a47a2aac22-profile4.jpg"
                    },
                    "name": {
                        "S": "profile4.jpg"
                    },
                    "id": {
                        "S": "profile-images/8d95157e-4585-4db7-b7e7-69a47a2aac22-profile4.jpg"
                    },
                    "mimeType": {
                        "S": "image/jpeg"
                    },
                    "userId": {
                        "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
                    }
                },
                "SequenceNumber": "25162700000000017901199073",
                "SizeBytes": 387,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-profile-images/stream/2021-12-09T09:47:09.066"
        }
    ]
}