# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Workspace.destroy_all
  Channel.destroy_all
  
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('workspaces')
  ApplicationRecord.connection.reset_pk_sequence!('workspace_subscriptions')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    demo_user_1 = User.create!(
      display_name: 'Demo-1', 
      email: 'demo1@user.io', 
      password: 'password',
      title: "Full Stack Engineer" 
    )

    demo_user_2 = User.create!(
      display_name: 'Demo-2', 
      email: 'demo2@user.io', 
      password: 'password',
      title: "front-end developer" 
    )

    # More users
    10.times do 
      User.create!({
        display_name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating workspaces..."

    workspace_1 = Workspace.create!(
      name: "App Academy",
      owner_id: demo_user_1.id
    )
    
    workspace_2 = Workspace.create!(
      name: "Full stack development",
      owner_id: demo_user_1.id
    )

    workspace_3 = Workspace.create!(
      name: "Front-end development",
      owner_id: demo_user_1.id
    )

    workspace_4 = Workspace.create!(
      name: "Movies",
      owner_id: demo_user_1.id
    )

    workspace_5 = Workspace.create!(
      name: "Music",
      owner_id: demo_user_2.id
    )

    puts "Creating workspace subscriptions..."
    WorkspaceSubscription.create!(
      workspace_id: workspace_1.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_1.id,
      user_id: demo_user_2.id
    )
    
    WorkspaceSubscription.create!(
      workspace_id: workspace_2.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_3.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_4.id,
      user_id: demo_user_1.id
    )
    
    WorkspaceSubscription.create!(
      workspace_id: workspace_5.id,
      user_id: demo_user_1.id
    )

    WorkspaceSubscription.create!(
      workspace_id: workspace_5.id,
      user_id: demo_user_2.id
    )


    puts "Creating channels..."
  
    workspace_1_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_1.id
    )

    workspace_1_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_1.id
    )

    workspace_1_announcements = Channel.create!(
      name: "announcements",
      owner_id: demo_user_1.id,
      workspace_id: workspace_1.id
    )

    workspace_2_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_2.id
    )

    workspace_2_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_2.id
    )

    workspace_2_help_requests = Channel.create!(
      name: "help-requests",
      owner_id: demo_user_2.id,
      workspace_id: workspace_2.id
    )

    workspace_3_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_3_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_3.id
    )

    workspace_4_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_4.id
    )

    workspace_4_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_1.id, 
    workspace_id: workspace_4.id
    )

    workspace_5_general = Channel.create!(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', 
    owner_id: demo_user_2.id, 
    workspace_id: workspace_5.id
    )

    workspace_5_random = Channel.create!(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', 
    owner_id: demo_user_2.id, 
    workspace_id: workspace_5.id
    )

    puts "Creating channel subscriptions..."
    ChannelSubscription.create!(
      channel_id: workspace_1_general.id,
      user_id: demo_user_1.id
    )
    
    ChannelSubscription.create!(
      channel_id: workspace_1_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_1_announcements.id,
      user_id: demo_user_1.id
    )
      
    ChannelSubscription.create!(
      channel_id: workspace_2_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_2_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_2_help_requests.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_3_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_3_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_4_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_4_random.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_5_general.id,
      user_id: demo_user_1.id
    )

    ChannelSubscription.create!(
      channel_id: workspace_5_random.id,
      user_id: demo_user_1.id
    )
    
    puts "Done!"
  end