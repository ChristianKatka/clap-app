import {Observable, from} from 'rxjs';
import {USERS_TABLE} from '../constants';
import {docClient} from '../instances/aws';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import moment from 'moment';

export class UsersService {

  public static storeNewUser(user: User): Observable<User> {
    console.log('HEY JOO storeNewUser');
    
    const params = {
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(confirmed)'
    };
    return from(docClient.put(params).promise()).pipe(map(response => user));
  }

  public static updateConfirmedUser(userName: string, sub: string, confirmed: boolean): Observable<any> {

    console.log('UPdate confirmed user lambda kohta menossa');
    

    const params = {
      TableName: USERS_TABLE,
      Key: {
        userName: userName
      },
      UpdateExpression: 'SET #sub = :sub, #confirmed = :confirmed, #updated_at = :updated_at ' +
        'REMOVE #expectationsAnswered, #firstName, #lastName, #phone, #messageSettings, #userType',

      ExpressionAttributeNames: {
        '#sub': 'sub',
        '#confirmed': 'confirmed',
        '#updated_at': 'updated_at',
        '#expectationsAnswered': 'expectationsAnswered',
        '#firstName': 'firstName',
        '#lastName': 'lastName',
        '#phone': 'phone',
        '#messageSettings': 'messageSettings',
        '#userType': 'userType'
      },
      ExpressionAttributeValues: {
        ':sub': sub,
        ':confirmed': confirmed,
        ':updated_at': moment().format()
      },
    };

    return from(docClient.update(params).promise()).pipe(
      map(response => {

        console.log('Update response: ' + JSON.stringify(response, null, 4));

        return response;
      })
    );

  }

}
