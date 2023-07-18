# aptos init --profile bob
# aptos init --profile alice

# create_task
aptos move run --function-id local::bountytask::create_task --args string:'help alice' --args u64:100000 --profile alice

# take
aptos move run --function-id local::bountytask::take_task --args u64:3 --profile bob

# submit
aptos move run --function-id local::bountytask::submit_task --args u64:3 --profile bob

aptos move run --function-id local::bountytask::confirm_task --args u64:3 --args bool:true --args string:'well done' --profile alice

aptos move view --function-id local::bountytask::get_counter --profile alice

aptos move view --function-id local::bountytask::read_task --args string:3 --profile alice