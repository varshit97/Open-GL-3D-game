#version 330 core

// Interpolated values from the vertex shaders
in vec2 fragTexCoord;
in vec3 objectPositionout;
in vec3 playerPositionout;
in float playerAngleout;
in float levelout;
// output data
out vec3 color;

// Texture sample for the whole mesh
uniform sampler2D texSampler;

void main()
{
    // Output color = color from texture sample specified in the vertex shader,
    // interpolated between all 3 surrounding vertices of the triangle
    vec3 playerDirection = vec3(10*sin((3.14/180)*playerAngleout),0,-10*cos((3.14/180)*playerAngleout));
    vec3 vertexDirection = objectPositionout-playerPositionout;
    float angle = acos(dot(playerDirection,vertexDirection)/(length(playerDirection)*length(vertexDirection))) *(180/3.14);
    color = texture( texSampler, fragTexCoord ).rgb;
    float dist = length(objectPositionout - playerPositionout);
    if(levelout == 2)
    if(angle<=25)
    	color = color * (1.0/dist) * 10.0;
    else
	    color = color * (1.0/dist) * 3.0;
    if(levelout == 3)
	    color = color *0.7;
}
