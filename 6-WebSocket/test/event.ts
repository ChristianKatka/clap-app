// like event
export const event = {
    "Records": [
        {
            "eventID": "27dcac838575f3913100274850596616",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "eu-west-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1644758264,
                "Keys": {
                    "id": {
                        "S": "356a1c18-7f5d-49a5-a98d-27598f1042c7"
                    }
                },
                "NewImage": {
                    "createdAt": {
                        "N": "1644758263805"
                    },
                    "nickname": {
                        "S": "MattiSeppo"
                    },
                    "id": {
                        "S": "356a1c18-7f5d-49a5-a98d-27598f1042c7"
                    },
                    "postId": {
                        "S": "16ec8cbb-11a7-4c03-a9de-a0e1875927c7"
                    },
                    "userId": {
                        "S": "9d8320bf-728d-44e9-96e0-48cda0838f6c"
                    }
                },
                "SequenceNumber": "337030300000000025339165206",
                "SizeBytes": 195,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-posts-likes/stream/2021-12-04T15:17:41.609"
        }
    ]
}



// db COMMENT EVENT
// export const event = {
//     "Records": [
//         {
//             "eventID": "37baee820ab15198efa3228ec0430239",
//             "eventName": "INSERT",
//             "eventVersion": "1.1",
//             "eventSource": "aws:dynamodb",
//             "awsRegion": "eu-west-1",
//             "dynamodb": {
//                 "ApproximateCreationDateTime": 1644416276,
//                 "Keys": {
//                     "id": {
//                         "S": "5c807cd5-5228-4969-bf60-cea7f0839aa3"
//                     }
//                 },
//                 "NewImage": {
//                     "postMediaUrl": {
//                         "BOOL": false
//                     },
//                     "createdAt": {
//                         "N": "1644416276064"
//                     },
//                     "postText": {
//                         "S": "asdcccc"
//                     },
//                     "postLikersNickname": {
//                         "S": "MattiSeppo"
//                     },
//                     "userIdThisNotificationBelongsTo": {
//                         "S": "0668311c-3c1d-4cf8-b12d-ef4ebba91d37"
//                     },
//                     "id": {
//                         "S": "5c807cd5-5228-4969-bf60-cea7f0839aa3"
//                     },
//                     "postId": {
//                         "S": "1ef6060a-e2cf-4483-a1db-d53aa56f41ab"
//                     },
//                     "userId": {
//                         "S": "9d8320bf-728d-44e9-96e0-48cda0838f6c"
//                     },
//                     "seen": {
//                         "BOOL": false
//                     }
//                 },
//                 "SequenceNumber": "100286400000000058792522466",
//                 "SizeBytes": 305,
//                 "StreamViewType": "NEW_AND_OLD_IMAGES"
//             },
//             "eventSourceARN": "arn:aws:dynamodb:eu-west-1:177244120069:table/clap-app-notifications/stream/2022-01-19T11:22:53.313"
//         }
//     ]
// }




//  SOCKET EVENT
// export const event = {
//     "headers": {
//         "Host": "66l1btssa8.execute-api.eu-west-1.amazonaws.com",
//         "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
//         "Sec-WebSocket-Key": "dA/DoGiMXDXpD0sTx0ihiQ==",
//         "Sec-WebSocket-Version": "13",
//         "X-Amzn-Trace-Id": "Root=1-61c6f648-13e9aaf1774b6fef1bdd72d3",
//         "X-Forwarded-For": "85.76.48.82",
//         "X-Forwarded-Port": "443",
//         "X-Forwarded-Proto": "https"
//     },
//     "multiValueHeaders": {
//         "Host": [
//             "66l1btssa8.execute-api.eu-west-1.amazonaws.com"
//         ],
//         "Sec-WebSocket-Extensions": [
//             "permessage-deflate; client_max_window_bits"
//         ],
//         "Sec-WebSocket-Key": [
//             "dA/DoGiMXDXpD0sTx0ihiQ=="
//         ],
//         "Sec-WebSocket-Version": [
//             "13"
//         ],
//         "X-Amzn-Trace-Id": [
//             "Root=1-61c6f648-13e9aaf1774b6fef1bdd72d3"
//         ],
//         "X-Forwarded-For": [
//             "85.76.48.82"
//         ],
//         "X-Forwarded-Port": [
//             "443"
//         ],
//         "X-Forwarded-Proto": [
//             "https"
//         ]
//     },
//     "requestContext": {
//         "routeKey": "$connect",
//         "eventType": "CONNECT",
//         "extendedRequestId": "K5trbG04joEFzdg=",
//         "requestTime": "25/Dec/2021:10:45:28 +0000",
//         "messageDirection": "IN",
//         "stage": "production",
//         "connectedAt": 1640429128939,
//         "requestTimeEpoch": 1640429128939,
//         "identity": {
//             "sourceIp": "85.76.48.82"
//         },
//         "requestId": "K5trbG04joEFzdg=",
//         "domainName": "66l1btssa8.execute-api.eu-west-1.amazonaws.com",
//         "connectionId": "K5trbcorjoECIfA=",
//         "apiId": "66l1btssa8"
//     },
//     "isBase64Encoded": false
// }

