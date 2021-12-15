export const event = {
    "Records": [
        {
            "eventID": "928537105c3d99d06a1c6ad614a35985",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1639583332,
                "Keys": {
                    "id": {
                        "S": "24195259-5a59-4578-814f-6a45795053b1"
                    }
                },
                "OldImage": {
                    "createdAt": {
                        "N": "1639583297758"
                    },
                    "postType": {
                        "S": "withoutImage"
                    },
                    "nickname": {
                        "S": "ChristianKatka"
                    },
                    "id": {
                        "S": "24195259-5a59-4578-814f-6a45795053b1"
                    },
                    "text": {
                        "S": "POISTETTU!"
                    },
                    "userId": {
                        "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
                    },
                    "postLikes": {
                        "L": []
                    }
                },
                "SequenceNumber": "55742200000000030116866622",
                "SizeBytes": 203,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts/stream/2021-12-03T20:13:17.090"
        }
    ]
}
