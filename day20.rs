use std::env;
use std::cmp::Ordering;
use std::fs::File;
use std::io::prelude::*;

#[derive(PartialEq, Eq, PartialOrd, Ord, Debug, Clone)]
struct Vector {
    x: i64,
    y: i64,
    z: i64
}

#[derive(Debug, Clone)]
struct Particle {
    position: Vector,
    velocity: Vector,
    acceleration: Vector
}


impl Ord for Particle {
    fn cmp(&self, other: &Self) -> Ordering {
        (self.position.x, self.position.y, self.position.z).cmp(&(other.position.x, other.position.y, other.position.z))
    }
}

impl PartialOrd for Particle {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Particle {
    fn eq(&self, other: &Self) -> bool {
        (self.position.x, self.position.y, self.position.z) == (other.position.x, other.position.y, other.position.z)
    }
}

impl Eq for Particle { }


/*
impl PartialEq for Particle {
    fn eq(&self, comparee: &Self) -> bool {
        if self.position.x == comparee.position.x &&
        self.position.y == comparee.position.y &&
        self.position.z == comparee.position.z {
            return true
        } else {
            return false
        }
    }
}

pub trait Ord: Eq + PartialOrd<Self> {
    fn cmp(&self, other: &Self) -> Ordering;
}

impl PartialOrd for Particle {
    fn eq(&self, comparee: &Self) -> bool {
        if self.position.x == comparee.position.x &&
        self.position.y == comparee.position.y &&
        self.position.z == comparee.position.z {
            return true
        } else {
            return false
        }
    }
}

impl Ord for Particle {}
impl Eq for Particle {}
*/

fn main() {
    let args: Vec<String> = env::args().collect();

    let filename = &args[1];

    println!("In file {} {}", filename, i64::max_value());

    let mut f = File::open(filename).expect("file read error");

    let mut contents = String::new();

    f.read_to_string(&mut contents).expect("something went wrong reading the file");

    let split = contents.trim().split("\n");

    let vec = split.collect::<Vec<&str>>();

    let mut mapped_vec: Vec<Particle> = vec.iter().map(create_particle).collect();

    let mut counter = 0;

    loop {
        counter += 1;

        let mut minimum = 7000000000000000000;
        let mut idx = 7000000000000000000;


        //reject_all(&mut mapped_vec);

        mapped_vec.sort();
        mapped_vec.dedup();
        
        for i in 0..mapped_vec.len() {
            update_particle(&mut mapped_vec[i]);
        }
        
        for i in 0..mapped_vec.len() {
            if distance(&mapped_vec[i]) < minimum {
                minimum = distance(&mapped_vec[i]);
                idx = i;
            }
        }
        
        if counter % 1000 == 0 {
            println!("Distance : {}, Idx: {}, Length: {}", minimum, idx, mapped_vec.len());
        }
    }

}

/*
fn reject_all(verts: &mut Vec<Particle>) {
    let mut counter = 0;
    loop {
        //println!("New loop");
        let prev_length = verts.len();

        let comparee = verts[counter].clone();
        verts.retain(|i| retainer(i, &comparee));
        
        //println!("After retain {} {} {}", verts.len(), prev_length, counter);
        let same = verts.len() == prev_length - 1;

        if same {
            counter += 1;
            verts.push(comparee);
        } else {
            counter = 0;
        }
        if counter >= verts.len() {
            break;
        }
    }
}
*/

/*
fn retainer(particle: &Particle, comparee: &Particle) -> bool {
    if particle.position.x == comparee.position.x &&
        particle.position.y == comparee.position.y &&
        particle.position.z == comparee.position.z {
        println!("Im removing {:?}", particle);
        return false
    } else {
        return true
    }
}
*/

fn update_particle(particle: &mut Particle) -> &mut Particle {
    particle.velocity.x += particle.acceleration.x;
    particle.velocity.y += particle.acceleration.y;
    particle.velocity.z += particle.acceleration.z;
    particle.position.x += particle.velocity.x;
    particle.position.y += particle.velocity.y;
    particle.position.z += particle.velocity.z;
    particle
}


fn distance(particle: &Particle) -> i64 {
    particle.position.x.abs() + particle.position.y.abs() + particle.position.z.abs()
}


fn create_particle(x: &&str) -> Particle {
    let particle_str: Vec<&str> = x.split(", ").collect();

    let position_string: String = particle_str[0].chars().skip(3).take(particle_str[0].len() - 4).collect();
    let position_vector: Vec<i64> = position_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();
    
    let velocity_string: String = particle_str[1].chars().skip(3).take(particle_str[1].len() - 4).collect();
    let velocity_vector: Vec<i64> = velocity_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();
    
    let acceleration_string: String = particle_str[2].chars().skip(3).take(particle_str[2].len() - 4).collect();
    let acceleration_vector: Vec<i64> = acceleration_string.trim().split(",").map(|x| x.parse::<i64>().unwrap()).collect();
    
    Particle {
        position: Vector { x: position_vector[0], y: position_vector[1], z: position_vector[2] },
        velocity: Vector { x: velocity_vector[0], y: velocity_vector[1], z: velocity_vector[2] },
        acceleration: Vector { x: acceleration_vector[0], y: acceleration_vector[1], z: acceleration_vector[2] }
    }
}