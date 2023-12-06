enum UserRole { CLIENT, DELIVERER }

class User {
  final String id;
  final String lastname;
  final String firstname;
  final String email;
  final String role;

  User({
    required this.id,
    required this.lastname,
    required this.firstname,
    required this.email,
    required this.role,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      lastname: json['lastname'],
      firstname: json['firstname'],
      email: json['email'],
      role: json['role'],
    );
  }
}
