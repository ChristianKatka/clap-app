export const event = {
    "Records": [
        {
            "eventID": "11a4ac38a647fbb4f660676d6d43df12",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1641472574,
                "Keys": {
                    "id": {
                        "S": "d69ed355-13c4-431a-b864-84d6b5998688"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1641472573941"
                    },
                    "nickname": {
                        "S": "MattiSeppo"
                    },
                    "id": {
                        "S": "d69ed355-13c4-431a-b864-84d6b5998688"
                    },
                    "postId": {
                        "S": "a844e074-271f-4f01-8f38-afab6459c45c"
                    },
                    "userId": {
                        "S": "9d8320bf-728d-44e9-96e0-48cda0838f6c"
                    }
                },
                "SequenceNumber": "156553100000000031088954230",
                "SizeBytes": 195,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts-likes/stream/2021-12-04T15:17:41.609"
        }
    ]
}