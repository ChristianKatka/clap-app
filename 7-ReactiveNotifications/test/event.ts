export const event = {
    "Records": [
        {
            "eventID": "dc29b85ebf3b5198127904b45cb6c071",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1645444537,
                "Keys": {
                    "id": {
                        "S": "0c53a9c9-7475-47ea-a7f8-29c6b370b8cd"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1645444537810"
                    },
                    "nickname": {
                        "S": "MattiSeppo"
                    },
                    "id": {
                        "S": "0c53a9c9-7475-47ea-a7f8-29c6b370b8cd"
                    },
                    "postId": {
                        "S": "119ab1f7-0dc5-4115-8159-d02dc6d7ef4e"
                    },
                    "userId": {
                        "S": "9d8320bf-728d-44e9-96e0-48cda0838f6c"
                    }
                },
                "SequenceNumber": "375276600000000022264030081",
                "SizeBytes": 195,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts-likes/stream/2021-12-04T15:17:41.609"
        }
    ]
}