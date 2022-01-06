export const event = {
    "Records": [
        {
            "eventID": "81d7f79e17c2571275856e0028fdd04b",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1641487961,
                "Keys": {
                    "id": {
                        "S": "e52be27e-8fc2-415d-9765-6af16cc0e808"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1641487961428"
                    },
                    "nickname": {
                        "S": "ChristianKatka"
                    },
                    "id": {
                        "S": "e52be27e-8fc2-415d-9765-6af16cc0e808"
                    },
                    "postId": {
                        "S": "a844e074-271f-4f01-8f38-afab6459c45c"
                    },
                    "userId": {
                        "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
                    }
                },
                "SequenceNumber": "157354700000000018513983233",
                "SizeBytes": 199,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts-likes/stream/2021-12-04T15:17:41.609"
        }
    ]
}